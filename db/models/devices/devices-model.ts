import { db } from '@/db/postgress'
import { devices } from '@/db/schema/devices'
import { eq } from 'drizzle-orm'
import {
    Device,
    CreateDevice,
    GetDevice,
    GetDevicesFromUser,
    UpdateDevicesIsActive,
    UpdateDeviceLastAccessedAt,
    DeleteDevice
} from './devices-model.d'

class DevicesModel {
    // craete

    async createDevice(data: CreateDevice): Promise<Device> {
        try {
            const device = await db.insert(devices).values({
                userID: data.userID,
                deviceName: data.deviceName,
                deviceType: data.deviceType,
                userAgent: data.userAgent
            }).returning()

            return device[0]
        } catch (error) {
            console.error('Creating device error:', error)
            throw error
        }
    }

    // read

    async getDevice(data: GetDevice): Promise<Device> {
        try {
            const device = await db.query.devices.findFirst({
                where: (eq(devices.id, data.id))
            })

            if (!device) {
                throw new Error('Device not found')
            }

            return device
        } catch (error) {
            console.error('Getting device error:', error)
            throw error
        }
    }

    async getDevicesFromUser(data: GetDevicesFromUser): Promise<Device[]> {
        try {
            const devicesFromUser = await db.query.devices.findMany({
                where: (eq(devices.userID, data.userID))
            })

            return devicesFromUser
        } catch (error) {
            console.error('Getting devices from user error:', error)
            throw error
        }

    }

    // update

    async updateDeviceIsActive(data: UpdateDevicesIsActive): Promise<Device> {
        try {
            const device = await db
                .update(devices)
                .set({
                    isActive: data.isActive
                })
                .where(eq(devices.id, data.id))
                .returning()

            return device[0]
        } catch (error) {
            console.error('Updating device is active error:', error)
            throw error
        }
    } 

    async updateDeviceLastAccessedAt(data: UpdateDeviceLastAccessedAt): Promise<Device> {
        try {
            const device = await db
                .update(devices)
                .set({
                    lastAccessedAt: data.lastAccessedAt
                })
                .where(eq(devices.id, data.id))
                .returning()

            return device[0]
        } catch (error) {
            console.error('Updating device last accessed at error:', error)
            throw error
        }
    }

    // delete

    async deleteDevice(data: DeleteDevice): Promise<Device> {
        try {
            const device = await db
                .delete(devices)
                .where(eq(devices.id, data.id))
                .returning()
            
            return device[0]
        } catch (error) {
            console.error('Deleting device error:', error)
            throw error
        }
    }
}

export default new DevicesModel()