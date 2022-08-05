export const routes = {
    pages: [
        {
            page: "Courses",
            url: "/courses"
        },
        {
            page: "Students",
            url: "/students"
        },
        {
            page: "Students/courses",
            url: "/student-courses"
        }
    ],
}

export const ui = {
    homeTitle: 'SCHOOL APP',
    delete: "Delete",
    Save: "Save",
    confirmDelete: "Are you sure to delete",
}

export const messages = {
    registrationError: 'The student already has the selected course'
}

export const inputs = {
    inputTypes: {
        select: 'select'
    },
}

export const apis = {
    course: `${process.env.REACT_APP_API}/courses`,
    student: `${process.env.REACT_APP_API}/students`,
    studentCourse: `${process.env.REACT_APP_API}/studentCourses`
}