import get from 'lodash/get';
import { store } from 'src/store/ConfigureStore';

export function calculateCost(type, size, configData) {
    const completeData = store.getState().ZoneReducer.cost;
    const calculatedCost = type === 'volume'
        ? size * get(completeData, 'volume.price', 0)
        : type === 'volumeBackup'
            ? size * get(completeData, 'volume_snapshot.price', 0)
            : type === 'instanceBackup'
                ? size * get(completeData, 'image.price', 0)
                : type === 'instance'
                    ? {
                        cpu: configData.cpu * get(completeData, 'cpu.price', 0),
                        ram: configData.ram * get(completeData, 'ram.price', 0),
                        disk: configData.disk * get(completeData, 'disk.price', 0),
                    }
                    : type === 'instanceList'
                        ? configData.cpu * get(completeData, 'cpu.price', 0)
                        + configData.ram * get(completeData, 'ram.price', 0)
                        + configData.disk * get(completeData, 'disk.price', 0)
                        : type === 'IP'
                            ? get(completeData, 'ip.price', 0)
                            :  type === 'network'
                                ? get(completeData, 'network.price', 0)
                                : type === 'calculator-cpu'
                                    ? size * get(completeData, 'cpu.price', 0)
                                    : type === 'calculator-ram'
                                        ? size * get(completeData, 'ram.price', 0)
                                        : type === 'calculator-disk'
                                            ? size * get(completeData, 'disk.price', 0)
                                            : type === 'calculator-disk_read'
                                                ? size * get(completeData, 'disk_read.price', 0)
                                                : type === 'calculator-disk_write'
                                                    ? size * get(completeData, 'disk_write.price', 0)
                                                    : type === 'calculator-volume'
                                                        ? size * get(completeData, 'volume.price', 0)
                                                        : type === 'calculator-volume_snapshot'
                                                            ? size * get(completeData, 'volume_snapshot.price', 0)
                                                            : type === 'calculator-image'
                                                                ? size * get(completeData, 'image.price', 0)
                                                                : type === 'calculator-ip'
                                                                    ? size * get(completeData, 'ip.price', 0)
                                                                    :0;

    return calculatedCost;
};
