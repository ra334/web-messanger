class MailService {
    async SendActivationMail(nickname: string, to: string, link: string) {
        console.log('Activated message')
    }
}


module.exports = new MailService()