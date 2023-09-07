import * as Cesium from "Cesium/Cesium";
import CesiumSensorVolumes from "cesium-sensor-volumes";
import { SatelliteProperties } from "./SatelliteProperties";
import { CesiumTimelineHelper } from "./CesiumTimelineHelper";
import { CesiumEntityWrapper } from "./CesiumEntityWrapper";
import { DescriptionHelper } from "./DescriptionHelper";

export class SatelliteEntityWrapper extends CesiumEntityWrapper {
  constructor(viewer, tle, tags) {
    super(viewer);
    this.timeline = new CesiumTimelineHelper(viewer);
    this.props = new SatelliteProperties(tle, tags);
  }

  enableComponent(name) {
    if (!this.created) {
      this.createEntities();
    }
    if (name === "Model" && !this.isTracked) {
      return;
    }
    super.enableComponent(name);
  }

  createEntities() {
    this.createDescription();

    this.entities = {};
    this.createPoint();
    // this.createBox();
    this.createLabel();
    if (this.props.orbit.orbitalPeriod < 60 * 12) {
      this.createOrbit();
      this.createOrbitTrack();
      this.createGroundTrack();
      this.createCone();
    }
    this.createModel();
    if (this.props.groundStationAvailable) {
      this.createGroundStationLink();
    }
    this.defaultEntity = this.entities.Point;

    // Add sampled position to all entities
    this.props.createSampledPosition(this.viewer.clock, (sampledPosition) => {
      Object.entries(this.entities).forEach(([type, entity]) => {
        if (type === "Orbit") {
          entity.position = this.props.sampledPositionInertial;
          entity.orientation = new Cesium.VelocityOrientationProperty(this.props.sampledPositionInertial);
        } else if (type === "SensorCone") {
          entity.position = sampledPosition;
          entity.orientation = new Cesium.CallbackProperty((time) => {
            const position = this.props.position(time);
            const hpr = new Cesium.HeadingPitchRoll(0, Cesium.Math.toRadians(180), 0);
            return Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
          }, false);
        } else {
          entity.position = sampledPosition;
          entity.orientation = new Cesium.VelocityOrientationProperty(sampledPosition);
        }
      });
    });

    this.viewer.selectedEntityChanged.addEventListener(() => {
      if (this.isSelected && !this.isTracked) {
        this.updatePasses();
      }
    });
    this.viewer.trackedEntityChanged.addEventListener(() => {
      if (this.isTracked) {
        this.artificiallyTrack(
          () => { this.updatePasses(); },
          () => { this.timeline.clearTimeline(); },
        );
      }
    });
  }

  createDescription() {
    const description = new Cesium.CallbackProperty((time) => {
      const cartographic = this.props.computePositionCartographicDegrees(time);
      const content = DescriptionHelper.renderDescription(time, this.props.name, cartographic, this.props.passes, false, this.props.orbit.tle);
      return content;
    }, false);
    this.description = description;
  }

  createCesiumSatelliteEntity(entityName, entityKey, entityValue) {
    this.createCesiumEntity(entityName, entityKey, entityValue, this.props.name, this.description, this.props.sampledPosition, true);
  }

  createPoint() {
    const point = new Cesium.PointGraphics({
      pixelSize: 10,
      color: Cesium.Color.WHITE,
    });
    this.createCesiumSatelliteEntity("Point", "point", point);
  }

  createBox() {
    const size = 1000;
    const box = new Cesium.BoxGraphics({
      dimensions: new Cesium.Cartesian3(size, size, size),
      material: Cesium.Color.WHITE,
    });
    this.createCesiumSatelliteEntity("Box", "box", box);
  }

  createModel() {
    const model = new Cesium.ModelGraphics({
      uri: `./data/models/${this.props.name.split(" ").join("-")}.glb`,
      minimumPixelSize: 50,
      maximumScale: 10000,
    });
    this.createCesiumSatelliteEntity("3D model", "model", model);
  }

  createLabel() {
    const label = new Cesium.LabelGraphics({
      text: this.props.name,
      scale: 0.6,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new Cesium.Cartesian2(15, 0),
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 6.0e7),
      pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1e1, 10, 2e5, 1),
    });
    this.createCesiumSatelliteEntity("Label", "label", label);
  }

  createOrbit() {
    const path = new Cesium.PathGraphics({
      leadTime: (this.props.orbit.orbitalPeriod * 60) / 2 + 5,
      trailTime: (this.props.orbit.orbitalPeriod * 60) / 2 + 5,
      material: Cesium.Color.WHITE.withAlpha(0.15),
      resolution: 600,
      width: 2,
    });
    this.createCesiumEntity("Orbit", "path", path, this.props.name, this.description, this.props.sampledPositionInertial, true);
  }

  createOrbitTrack(leadTime = this.props.orbit.orbitalPeriod * 60, trailTime = 0) {
    const path = new Cesium.PathGraphics({
      leadTime,
      trailTime,
      material: Cesium.Color.GOLD.withAlpha(0.15),
      resolution: 600,
      width: 2,
    });
    this.createCesiumSatelliteEntity("Orbit track", "path", path);
  }

  createGroundTrack() {
    const polyline = new Cesium.PolylineGraphics({
      material: Cesium.Color.ORANGE.withAlpha(0.2),
      positions: new Cesium.CallbackProperty((time) => this.props.groundTrack(time), false),
      followSurface: false,
      width: 10,
    });
    this.createCesiumSatelliteEntity("Ground track", "polyline", polyline);
  }

  createCone(fov = 10) {
    const cone = new Cesium.Entity();
    cone.addProperty("conicSensor");
    cone.conicSensor = new CesiumSensorVolumes.ConicSensorGraphics({
      radius: 1000000,
      innerHalfAngle: Cesium.Math.toRadians(0),
      outerHalfAngle: Cesium.Math.toRadians(fov),
      lateralSurfaceMaterial: Cesium.Color.GOLD.withAlpha(0.15),
      intersectionColor: Cesium.Color.GOLD.withAlpha(0.3),
      intersectionWidth: 1,
    });
    this.entities.SensorCone = cone;
  }

  createGroundStationLink() {
    const polyline = new Cesium.PolylineGraphics({
      followSurface: false,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.5,
        color: Cesium.Color.FORESTGREEN,
      }),
      positions: new Cesium.CallbackProperty((time) => {
        const satPosition = this.props.position(time);
        const groundPosition = this.props.groundStationPosition.cartesian;
        const positions = [satPosition, groundPosition];
        return positions;
      }, false),
      show: new Cesium.CallbackProperty((time) => this.props.passIntervals.contains(time), false),
      width: 5,
    });
    this.createCesiumSatelliteEntity("Ground station link", "polyline", polyline);
  }

  set groundStation(position) {
    // No groundstation calculation for GEO satellites
    if (this.props.orbit.orbitalPeriod > 60 * 12) {
      return;
    }

    this.props.groundStationPosition = position;
    this.props.clearPasses();
    if (this.isTracked) {
      this.timeline.clearTimeline();
    }
    if (this.isTracked || this.isSelected) {
      this.updatePasses();
    }
    if (this.created) {
      this.createGroundStationLink();
    }
  }

  updatePasses() {
    if (this.props.updatePasses(this.viewer.clock.currentTime)) {
      if (this.isTracked) {
        this.timeline.addHighlightRanges(this.props.passes);
      }
    }
  }
}
