import { db } from '@/db/postgress'
import { devices } from '@/db/schema/devices'
import { eq } from 'drizzle-orm'
import type {
    Device,
    CreateDevice,
    GetDevice,
    GetDevicesFromUser,
    UpdateDevicesIsActive,
    UpdateDeviceLastAccessedAt,
    DeleteDevice
} from '@/types/devices'

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
        } catch (error: any) {
            const userError = 'insert or update on table "devices" violates foreign key constraint "devices_userID_users_id_fk"'

            if (error.message === userError) {
                throw new Error('User not found')
            }

            throw error
        }
    }

    // read

    async getDevice(data: GetDevice): Promise<Device> {
        const device = await db.query.devices.findFirst({
            where: (eq(devices.id, data.id))
        })

        if (!device) {
            throw new Error('Device not found')
        }

        return device
    }

    async getDevicesFromUser(data: GetDevicesFromUser): Promise<Device[]> {
        const devicesFromUser = await db.query.devices.findMany({
            where: (eq(devices.userID, data.userID))
        })

        if (!devicesFromUser.length) {
            throw new Error('Devices not found')
        }

        return devicesFromUser
    }

    // update

    async updateDeviceIsActive(data: UpdateDevicesIsActive): Promise<Device> {
        const device = await db
            .update(devices)
            .set({
                isActive: data.isActive
            })
            .where(eq(devices.id, data.id))
            .returning()
        
        if (!device.length) {
            throw new Error('Device not found')
        }

        return device[0]
    } 

    async updateDeviceLastAccessedAt(data: UpdateDeviceLastAccessedAt): Promise<Device> {
        const device = await db
            .update(devices)
            .set({
                lastAccessedAt: data.lastAccessedAt
            })
            .where(eq(devices.id, data.id))
            .returning()

        if (!device.length) {
            throw new Error('Device not found')
        }

        return device[0]
    }

    // delete

    async deleteDevice(data: DeleteDevice): Promise<Device> {
        const device = await db
            .delete(devices)
            .where(eq(devices.id, data.id))
            .returning()
        
        if (!device.length) {
            throw new Error('Device not found')
        }

        return device[0]
    }
}

export default new DevicesModel()