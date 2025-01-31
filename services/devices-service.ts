import { z } from 'zod'
import devicesModel from '@/db/models/devices-model'
import type {
    Device,
    CreateDevice,
    GetDevice,
    GetDevicesFromUser,
    UpdateDevicesIsActive,
    UpdateDeviceLastAccessedAt,
    DeleteDevice
} from '@/types/devices'

const idSchema = z.object({
    id: z.string().uuid()
})

const userIDSchema = z.object({
    userID: z.string().uuid()
})

const deviceIDSchema = z.object({
    ...userIDSchema.shape,
    deviceName: z.string().min(1, 'Device name is required'),
    deviceType: z.string().min(1, 'Device type is required'),
    userAgent: z.string().min(1, 'User agent is required')
})

const updateDeviceIsActiveSchema = z.object({
    ...idSchema.shape,
    isActive: z.boolean()
})

const updateDeviceLastAccessedAtSchema = z.object({
    ...idSchema.shape,
    lastAccessedAt: z.date()
})

class DevicesService {
    async createDevice(data: CreateDevice): Promise<Device> {
        const parseData = deviceIDSchema.parse(data)
        return await devicesModel.createDevice(parseData)
    }

    async getDevice(data: GetDevice): Promise<Device> {
        const parseData = idSchema.parse(data)
        return await devicesModel.getDevice(parseData)
    }

    async getDevicesFromUser(data: GetDevicesFromUser): Promise<Device[]> {
        const parseData = userIDSchema.parse(data)
        return await devicesModel.getDevicesFromUser(parseData)
    }

    async updateDevicesIsActive(data: UpdateDevicesIsActive): Promise<Device> {
        const parseData = updateDeviceIsActiveSchema.parse(data)
        return await devicesModel.updateDeviceIsActive(parseData)
    }

    async updateDeviceLastAccessedAt(data: UpdateDeviceLastAccessedAt): Promise<Device> {
        const parseData = updateDeviceLastAccessedAtSchema.parse(data)
        return await devicesModel.updateDeviceLastAccessedAt(parseData)
    }

    async deleteDevice(data: DeleteDevice): Promise<Device> {
        const parseData = idSchema.parse(data)
        return await devicesModel.deleteDevice(parseData)
    }
}

export default new DevicesService()