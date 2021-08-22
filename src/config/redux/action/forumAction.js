export const setForm = (formType, formValue) => {
     return {type: 'SET_FORUM_FORM_DATA', formType, formValue};
}

export const clearForm = () => {
     return {type: 'CLEAR_FORUM_FORM'};
}
