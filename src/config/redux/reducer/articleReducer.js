const initialState = {
     articles: [],
     page: {
          totalData: 0,
          perPage: 10,
          currentPage: 1,
          totalPage: 0
     },
     article: [],
     form: {
          title: '',
          content: '',
          articlePhoto: '',
     },
     errors: {
          title: '',
          content: '',
          articlePhoto: '',
     }
}

const articleReducer = (state = initialState, action) => {
     
     if(action.type === 'SET_ARTICLES'){
          return {
               ...state,
               articles: action.payload,
          }
     }
     if(action.type === 'SET_ARTICLES_PAGE'){
          return {
               ...state,
               page: action.payload,
          }
     }
     if(action.type === 'SET_ARTICLE'){
          return {
               ...state,
               article: action.payload,
          }
     }
     if(action.type === 'SET_ARTICLE_FORM_DATA'){
          return {
               ...state,
               form : {
                    ...state.form,
                    [action.formType]: action.formValue,
               }
          }
     }
     if(action.type === 'SET_ARTICLE_ERRORS'){
          return {
               ...state,
               errors : {
                    ...state.errors,
                    [action.errorType]: action.errorMessage,
               }
          }
     }
     if(action.type === 'CLEAR_ARTICLE_FORM'){
          return {
               ...state,
               form : {
                   title: '',
                   content: '',
                   articlePhoto: '',
               }
          }
     }
     if(action.type === 'CLEAR_ARTICLE_ERROS'){
          return {
               ...state,
               errors : {
                   title: '',
                   content: '',
                   articlePhoto: '',
               }
          }
     }
     return state;
}

export default articleReducer;