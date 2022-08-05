import axios from "axios";
import { apis } from "../../Constants/constant";

const baseUrl = apis.course;

/**
 * Makes a HTTP request to get all courses in JSON format.
 * @returns promise result.
 */
const getAll = () => axios.get(baseUrl)

/**
 * Makes a HTTP request to get an course.
 * @returns promise result.
 */
 const getCourse = (id) => {
    const url = `${baseUrl}?id=${id}`
    return axios.get(url)
 }

/**
 * Makes a HTTP request to update an course.
 * @returns promise result.
 */
const update = (data) => {
    const url = `${baseUrl}/${data.id}`
    return axios.put(url, data)
}

/**
 * Makes a HTTP request to delete an course.
 * @returns promise result.
 */
const deleteCourse = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

/**
 * Makes a HTTP request to save an course.
 * @returns promise result.
 */
 const save = (data) => axios.post(baseUrl, data)

export const courseService = {
    getAll,
    getCourse,
    update,
    deleteCourse,
    save
}