import {SET_GAME,SET_QUESTIONS} from '../Actions/ActionType'

const initialState={
  GamePayload:{
      Questions:5,
      Region:[1]
  },
  Questions:[
    {
        "Image": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt0134273.jpg",
        "Qid": "tt0134273",
        "options": [
            {
                "Id": 0,
                "Name": "Creepshow"
            },
            {
                "Id": 1,
                "Name": "Dead Poets Society"
            },
            {
                "Id": 2,
                "Name": "Full Metal Jacket"
            },
            {
                "Id": 4,
                "Name": "Das Boot"
            }
        ]
    },
    {
        "Image": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt0095953.jpg",
        "Qid": "tt0095953",
        "options": [
            {
                "Id": 0,
                "Name": "Grave of the Fireflies"
            },
            {
                "Id": 1,
                "Name": "Stand by Me"
            },
            {
                "Id": 2,
                "Name": "The Sting"
            },
            {
                "Id": 4,
                "Name": "Life of Brian"
            }
        ]
    },
    {
        "Image": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt0822832.jpg",
        "Qid": "tt0822832",
        "options": [
            {
                "Id": 0,
                "Name": "1941"
            },
            {
                "Id": 1,
                "Name": "Rain Man"
            },
            {
                "Id": 2,
                "Name": "Rambo: First Blood Part II"
            },
            {
                "Id": 4,
                "Name": "Superman"
            }
        ]
    },
    {
        "Image": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt1599348.jpg",
        "Qid": "tt1599348",
        "options": [
            {
                "Id": 0,
                "Name": "Blade Runner"
            },
            {
                "Id": 1,
                "Name": "Sholay"
            },
            {
                "Id": 2,
                "Name": "The Shining"
            },
            {
                "Id": 4,
                "Name": "The Living Daylights"
            }
        ]
    },
    {
        "Image": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt1477715.jpg",
        "Qid": "tt1477715",
        "options": [
            {
                "Id": 0,
                "Name": "The Terminator"
            },
            {
                "Id": 1,
                "Name": "Superman II"
            },
            {
                "Id": 2,
                "Name": "The Princess Bride"
            },
            {
                "Id": 4,
                "Name": "Back to the Future Part II"
            }
        ]
    }
]

}


const SPReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_GAME:
            return{
                ...state,
                GamePayload:action.data
            }
        
        case SET_QUESTIONS:
            return{
                ...state,
                Questions:action.data
            }

        default:
            return state    
    }
}

export default SPReducer;