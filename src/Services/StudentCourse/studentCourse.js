import axios from "axios";
import { apis } from "../../Constants/constant";

const baseUrl = apis.studentCourse;

/**
 * Makes a HTTP request to get all students and courses in JSON format.
 * @returns promise result.
 */
 const getAll = () => axios.get(baseUrl)

 /**
 * Makes a HTTP request to search students and courses based on search criteria.
 * @returns promise result.
 */
  const searchStudentCourse = (criteria) => {
    const params = new URLSearchParams(criteria)
    const url = `${baseUrl}?${params}`
    return axios.get(url)
  }

/**
 * Makes a HTTP request to save an student course.
 * @returns promise result.
 */
 const save = (data) => axios.post(baseUrl, data)

 /**
 * Makes a HTTP request to update an student course.
 * @returns promise result.
 */
const update = (data) => {
  const url = `${baseUrl}/${data.id}`
  return axios.put(url, data);
}

/**
 * Makes a HTTP request to delete an student course.
 * @returns promise result.
 */
const deleteStudentCourse = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

export const studentCourseService = {
    getAll,
    searchStudentCourse,
    update,
    deleteStudentCourse,
    save
}