import axios from "axios";
import { apis } from "../../Constants/constant";

const baseUrl = apis.student;

/**
 * Makes a HTTP request to get all students in JSON format.
 * @returns promise result.
 */
const getAll = () => axios.get(baseUrl)

/**
 * Makes a HTTP request to get an student.
 * @returns promise result.
 */
 const getStudent = (id) => {
    const url = `${baseUrl}?id=${id}`
    return axios.get(url)
 }

/**
 * Makes a HTTP request to update an student.
 * @returns promise result.
 */
const update = (data) => axios.put(baseUrl, data)

/**
 * Makes a HTTP request to delete an student.
 * @returns promise result.
 */
const deleteStudent = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

/**
 * Makes a HTTP request to save an student.
 * @returns promise result.
 */
 const save = (data) => axios.post(baseUrl, data)

export const studentService = {
    getAll,
    getStudent,
    update,
    deleteStudent,
    save
}