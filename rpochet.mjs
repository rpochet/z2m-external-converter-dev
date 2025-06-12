//import * from "zigbee-herdsman-converters";
import * as fz from "zigbee-herdsman-converters/converters/fromZigbee";
import {presets} from "zigbee-herdsman-converters/lib/exposes";
import * as m from "zigbee-herdsman-converters/lib/modernExtend";
import * as reporting from "zigbee-herdsman-converters/lib/reporting";

export default {
    zigbeeModel: ["pzem004t"],
    model: "pzem004t",
    vendor: "rpochet",
    description: "Smart energy monitor for 1P+N system using ESP32 and PEZM-004T",
    extend: [
        m.deviceEndpoints({
            endpoints: {1: 1, 2: 2},
        }),
        m.electricityMeter({
            cluster: "electrical",
        }),
    ],
    configure: async (device, coordinatorEndpoint) => {
        const endpoint2 = device.getEndpoint(2);
        await reporting.readEletricalMeasurementMultiplierDivisors(endpoint2);
    },
    /**
     * Clusters reporting "from zigbee"
     */
    fromZigbee: [fz.electrical_measurement],
    /**
     * Clusters to send commands "to zigbee"
     */
    toZigbee: [],
    meta: {
        multiEndpoint: true,
    },
    exposes: [
        presets.ac_frequency(),
        presets.current(),
        presets.voltage(),
        presets.energy(),
        presets.power_factor(),
        presets.power(),
        presets.power_apparent(),
        presets.power_reactive(),
    ],
};
