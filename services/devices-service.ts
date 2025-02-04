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
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }

    async createDevice(data: CreateDevice): Promise<Device> {
        try {
            const parseData = deviceIDSchema.parse(data)
            return await devicesModel.createDevice(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getDevice(data: GetDevice): Promise<Device> {
        try {
            const parseData = idSchema.parse(data)
            return await devicesModel.getDevice(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getDevicesFromUser(data: GetDevicesFromUser): Promise<Device[]> {
        try {
            const parseData = userIDSchema.parse(data)
            return await devicesModel.getDevicesFromUser(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateDevicesIsActive(data: UpdateDevicesIsActive): Promise<Device> {
        try {
            const parseData = updateDeviceIsActiveSchema.parse(data)
            return await devicesModel.updateDeviceIsActive(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateDeviceLastAccessedAt(data: UpdateDeviceLastAccessedAt): Promise<Device> {
        try {
            const parseData = updateDeviceLastAccessedAtSchema.parse(data)
            return await devicesModel.updateDeviceLastAccessedAt(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async deleteDevice(data: DeleteDevice): Promise<Device> {
        try {
            const parseData = idSchema.parse(data)
            return await devicesModel.deleteDevice(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }
}

export default new DevicesService()