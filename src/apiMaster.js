import axios from "axios";
const url = process.env.URL;

const getProductList = () => {

  return axios.get(`${url}/products`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const getProductInfo = (id = 66642) => {
  return axios.get(`${url}/products/${id}`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const getProductStyles = (id = 66642) => {
  return axios.get(`${url}/products/${id}/styles`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const getRelatedProducts = (id = 66642) => {
  return axios.get(`${url}/products/${id}/related`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const getQA = (id = 66642) => {
  return axios.get(`${url}/qa/questions/?product_id=66642`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const getReviewMetaData = (id = 66642) => {
  return axios.get(`${url}/reviews/meta/?product_id=66642`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const getReviewsOfProduct = (id = 66642, sortString = "relevant", count = 20) => {
  return axios.get(
    `${url}/reviews/?product_id=66642`, {
      headers: {
        'Authorization': "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"
      }
    }
  );
};

const reportReview = (reviewId) => {
  return axios.put(`${url}/reviews/report/${reviewId}`, {
    headers: {
      'Authorization': "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"
    }
  });
};

const postReview = (
  id = 66642,
  rating,
  summary,
  body,
  recommend,
  name,
  email,
  photos,
  characteristics
) => {
  return axios.post(`${url}/reviews/${id}`, {
    rating: rating,
    summary: summary,
    body: body,
    recommend: recommend,
    name: name,
    email: email,
    photos: photos,
    characteristics: characteristics,
    headers: {
      'Authorization': "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"
    }
  });
};

const getCart = (userToken) => {
  return axios.get(`${url}/cart/${userToken}`, {headers: {
    'Authorization': "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"
  }});
};

const addToCart = (user_token, sku_id) => {
  console.log(user_token);
  console.log(sku_id);
  return axios.post(`${url}/cart/`, {
    user_token: user_token,
    sku_id: sku_id,
    headers: {
      'Authorization': "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"
    }
  });
};

const getSpecificAnswers = (questionId) => {
  return axios.get(`${url}/qa/questions/${questionId}/answers`, {headers: {
    'Authorization': "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"
  }});
};

const askQuestion = (id, text, name, email) => {
  return axios.post(`${url}/qa/${id}`, {
    body: text,
    name: name,
    email: email,
    headers: {
      'Authorization': "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"
    }
  });
};

const answerQuestion = (questionId, text, name, email, photos = []) => {
  return axios.post(`${url}/qa/${questionId}/answers`, {
    body: text,
    name: name,
    email: email,
    photos: photos,
    headers: {
      'Authorization': "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"
    }
  });
};

const markQAsHelpful = (questionId) => {
  return axios.put(`${url}/qa/question/${questionId}/helpful`, {headers: {
    'Authorization': "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"
  }});
};

const reportQuestion = (questionId) => {
  return axios.put(`${url}/qa/question/${questionId}/report`, {headers: {
    'Authorization': "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"
  }});
};

const markAnsAsHelpful = (answerID) => {
  return axios.put(`${url}/qa/answer/${answerID}/helpful`, {headers: {
    'Authorization': "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"
  }});
};

const reportAns = (answerID) => {
  return axios.put(`${url}/qa/answer/${answerID}/report`, {headers: {
    'Authorization': "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"
  }});
};

const apiMaster = {
  getProductList: getProductList,
  getProductInfo: getProductInfo,
  getProductStyles: getProductStyles,
  getRelatedProducts: getRelatedProducts,
  getQA: getQA,
  getSpecificAnswers: getSpecificAnswers,
  askQuestion: askQuestion,
  answerQuestion: answerQuestion,
  markQAsHelpful: markQAsHelpful,
  reportQuestion: reportQuestion,
  markAnsAsHelpful: markAnsAsHelpful,
  reportAns: reportAns,
  getReviewMetaData: getReviewMetaData,
  getReviewsOfProduct: getReviewsOfProduct,
  postReview: postReview,
  reportReview: reportReview,
  getCart: getCart,
  addToCart: addToCart,
};

export default apiMaster;
