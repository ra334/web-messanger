interface Device {
    id: string;
    userID: string;
    deviceName: string;
    deviceType: string;
    userAgent: string;
    isActive: boolean;
    lastAccessedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface CreateDevice {
    userID: string;
    deviceName: string;
    deviceType: string;
    userAgent: string;
}

interface GetDevice {
    id: string;
}

interface GetDevicesFromUser {
    userID: string;
}

interface UpdateDevicesIsActive {
    id: string;
    isActive: boolean;
}

interface UpdateDeviceLastAccessedAt {
    id: string;
    lastAccessedAt: Date;
}

interface DeleteDevice {
    id: string;
}

export {
    Device,
    CreateDevice,
    GetDevice,
    GetDevicesFromUser,
    UpdateDevicesIsActive,
    UpdateDeviceLastAccessedAt,
    DeleteDevice
}