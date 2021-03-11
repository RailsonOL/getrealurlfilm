import { encodeDecode } from '../../../utils/utils'
import axios from 'axios'

const get = async (req, res) => {
        let videourl = encodeDecode(req.query.videourl, 'decode', 'base64')
        let response = ''

        await axios.get(videourl, {
          maxRedirects: 0
        })
          .then(function (res) {
            response = res.response.headers.location
          })
          .catch((err) => {
            response = err.response.headers.location
          })
      
        res.setHeader('Cache-Control', 's-maxage=84000, stale-while-revalidate')
        return res.redirect(301, response)

}

export default get