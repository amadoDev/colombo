/* eslint-disable no-console */
import optimizaApi from '~/plugins/optimizaApi'
import colomboApi from '~/plugins/colomboApi'
import cmsApi from '~/plugins/cmsApi'
import * as Utils from '~/scripts/utils.js'

export const getUUID = async url => {
  const { data } = await colomboApi
    .get(`/api/v1/scan/${url}`)
    .catch(error =>
      console.log(`Error: Cannot GET website identifier ${error}`)
    )
  return data
}

export const getSummary = async uuid => {
  const { data } = await colomboApi
    .get(`/api/v1/response/${uuid}`)
    .catch(error => console.log(`Error: Cannot GET sumary report ${error}`))
  return data
}

export const getBoxStatus = async uuid => {
  const boxes = [
    'ContentOptimizationBox',
    'SearchCompetitorsBox',
    'SocialNetworksOptimizationBox',
    'LocalSeoBox',
    'PayPerClickBox'
  ]
  const promises = []
  const formattedResp = {}
  boxes.forEach(el => {
    promises.push(
      colomboApi
        .get(`/api/v1/request/${uuid}/box/${el}`)
        .catch(error => console.log(`Error: Cannot GET box status ${error}`))
    )
  })
  const response = await Promise.all(promises)
  response.forEach((el, index) => {
    formattedResp[boxes[index]] = el.data.result.status
  })
  return formattedResp
}

export const setBoxStatus = async (uuid, box) => {
  await colomboApi
    .post(`/api/v1/request/${uuid}/box/${box.key}/${box.value}`)
    .then(response => response.status === 'OK')
    .catch(error => console.log(`Error: Cannot POST attribute ${error}`))
}

export const getFormFields = async (uuid, fields) => {
  const keys = fields || [
    'catalog',
    'description',
    'picture',
    'blog',
    'video',
    'competitor_url1',
    'competitor_url2',
    'competitor_url3',
    'business',
    'address',
    'postalcode',
    'telephone',
    'city',
    'epigraph',
    'keywords',
    'market',
    'activity',
    'google_ads',
    'google_calls',
    'facebook_ads'
  ]
  const { data } = await colomboApi
    .get(`/api/v1/request/${uuid}/fields/?keys=${keys}`)
    .catch(error => console.log(`Error: Cannot GET form fields. ${error}`))
  return data.result
}

export const setFormFields = async (uuid, fields) => {
  await colomboApi
    .post(`/api/v1/request/${uuid}/fields/update`, fields)
    .then(response => response.data.status === 'OK')
    .catch(error => console.log(`Error: Cannot SET form fields. ${error}`))
}

export const setCompetitors = async (uuid, website, domains) => {
  const competitors = { ...domains, main_domain: website }
  await colomboApi
    .post(`/api/v1/sources/${uuid}/competitors`, {
      domains: competitors
    })
    .then(response => response.data.status === 'OK')
    .catch(error => console.log(`Error: Cannot SET competitors. ${error}`))
}

export const setPm = async (uuid, direction) => {
  // 'name' => 'Libreria Cervantes'
  // 'address_line1' => 'Calle Dr. Casal, 9'
  // 'zip_code' => '33001'
  // 'city' => 'Oviedo'
  // 'phone' => '985207761'
  await colomboApi
    .post(`/api/v1/sources/${uuid}/pm`, direction)
    .then(response => response.data.status === 'OK')
    .catch(error => console.log(`Error: Cannot SET pm. ${error}`))
}

export const getEpigraphSuggestions = async query => {
  const { data } = await cmsApi
    .get(`/api/v1/directory-categories/?detailed=1&name__icontains=${query}`)
    .catch(error =>
      console.log(`Error: Cannot GET epigraph suggestions ${error}`)
    )
  const epigraph = data.results.map(
    epi => (epi = { value: epi.name, refNumber: epi.id })
  )
  return epigraph
}

export const getLocationSuggestions = async query => {
  const { data } = await cmsApi
    .get(`/seo/locations/get/?filter=${query}`)
    .catch(error =>
      console.log(`Error: Cannot GET location suggestions ${error}`)
    )
  const locations = data.map(
    loc => (loc = { value: loc.text, refNumber: loc.id })
  )
  return locations
}

export const getSeoMonkey = async (category, location) => {
  const { data } = await cmsApi
    .get(
      `/seo/expressions/get/?category=${category.ref}&location=${location.ref}`
    )
    .catch(error => console.log(`Error: Cannot GET seo monkeys ${error}`))

  const { available } = data
  const seoExp = []

  available.forEach(el => {
    seoExp.push(el.replace(location.value, '').trim())
  })

  const seoKeys = await optimizaApi({
    method: 'post',
    url: `/api/v3/keyword-validator/local/list/qdq/seo/${location.value}`,
    headers: {},
    data: {
      keywords: seoExp
    }
  })

  if (!seoKeys.data) {
    return false
  }

  const { keywords } = seoKeys.data.result

  Object.keys(keywords).forEach(el => {
    if (
      !(
        keywords[el].response &&
        keywords[el].response.validator &&
        keywords[el].response.validator.is_valid === 'valid'
      )
    ) {
      delete keywords[el]
    }
  })

  if (Utils.isOdd(Object.keys(keywords).length)) {
    const lowestROI = Object.values(keywords).find(el =>
      Math.min(el.response.parameters.roi)
    )
    delete keywords[lowestROI.response.parameters.keyword]
  }
  return {
    keywords,
    total: Object.keys(keywords).length
  }
}

export const setSeoMonkey = async (uuid, seoList, seoLength) => {
  // reduce to set number of keywords
  const arraySeoList = Object.values(seoList)

  arraySeoList.sort((a, b) => {
    return (
      a.response.parameters.roi - b.response.parameters.roi ||
      a.response.parameters.kfi - b.response.parameters.kfi ||
      a.response.parameters.google_cpc - b.response.parameters.google_cpc ||
      a.response.parameters.search_volume - b.response.parameters.search_volume
    )
  })

  arraySeoList.splice(0, arraySeoList.length - seoLength).reverse()

  const formatSeoListToPost = arraySeoList.map(elem => {
    return {
      keyword: elem.response.parameters.keyword,
      google_cpc: elem.response.parameters.google_cpc,
      search_volume: elem.response.parameters.search_volume
    }
  })

  const { data } = await colomboApi({
    method: 'post',
    url: `/api/v1/sources/${uuid}`,
    headers: {},
    data: {
      keywords: formatSeoListToPost
    }
  })
  const { status } = data
  return status === 'OK'
}

export const getShareLink = async uuid => {
  const { data } = await colomboApi
    .get(`/api/v1/shorturl/uuid/${uuid}`)
    .catch(error => console.log(`Error: Cannot GET share link url ${error}`))
  return data
}

export const getShareEmail = async (uuid, mail) => {
  const requestBody = { mail }
  const { data } = await colomboApi
    .post(`/api/v1/share/mail/${uuid}`, requestBody)
    .catch(error => console.log(`Error: Cannot SEND share email ${error}`))
  return data
}
