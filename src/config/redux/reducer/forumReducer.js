const initialState = {
     forums: [],
     forum: [],
     forumDetails: [],
     form: {
          title: '',
          content: '',
          forumPhoto: '',
     },
     page: {
          totalData: 0,
          perPage: 10,
          currentPage: 1,
          totalPage: 0
     },
     errors: {
          title: '',
          content: '',
          forumPhoto: '',
     }
}

const forumReducer = (state = initialState, action) => {

     if(action.type === 'SET_FORUMS'){
          return {
               ...state,
               forums: action.payload,
          }
     }
     if(action.type === 'SET_FORUM_DETAILS'){
          return {
               ...state,
               forumDetails: action.payload,
          }
     }
     if(action.type === 'SET_FORUM_FORM_DATA'){
          return {
               ...state,
               form: {
                    ...state.form,
                    [action.formType] : action.formValue,
               }
          }
     }
     if(action.type === 'SET_FORUM_ERRORS'){
          return {
               ...state,
               errors: {
                    ...state.errors,
                    [action.errorType]: action.errorMessage,
               }
          }
     }
     if(action.type === 'CLEAR_FORUM_FORM'){
          return {
               ...state,
               form: {
                    title: '',
                    content: '',
               }
          }
     }
     if(action.type === 'CLEAR_FORUM_ERRORS'){
          return {
               ...state,
               errors: {
                    title: '',
                    content: '',
               }
          }
     }
     if(action.type === 'SET_FORUMS_PAGE'){
          return {
               ...state,
               page: action.payload,
          }
     }
     if(action.type === 'SET_FORUM'){
          return {
               ...state,
               forum: action.payload,
          }
     }

     return state;
}

export default forumReducer;