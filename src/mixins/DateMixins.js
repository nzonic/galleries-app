import moment from 'moment';

export default {
    filters: {
        formatDate (string, outputFormat = 'YYYY-MM-DD HH:mm:ss') {
            return moment(string).format(outputFormat)
        },
        diffForHumans(string){
            return moment(string).fromNow()
        }
    }
}