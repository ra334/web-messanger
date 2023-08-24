class UserController {
    async registration(req: any, res: any, next: any) {
        try {
            
        } 

        catch (e) {
            
        }
    }

    async login(req: any, res: any, next: any) {
        try {

        } 

        catch (e) {

        }
    } 

    async logout(req: any, res: any, next: any) {
        try {

        } 

        catch (e) {

        }
    } 

    getUser(req: any, res: { json: (arg0: string[]) => void }, next: any) {
        try {
            res.json(['122', '1213'])
        } 

        catch (e) {

        }
    } 

    async refresh(req: any, res: any, next: any) {
        try {

        } 

        catch (e) {

        }
    }

    async activate(req: any, res: any, next: any) {
        try {

        } 

        catch (e) {

        }
    } 


}

module.exports = new UserController()