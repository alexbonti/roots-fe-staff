import { AccessToken } from "contexts/helpers";
import axios from "axios";
import { axiosInstance } from "helpers";
import { notify } from 'components';

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
}


/**
 * @author Sanchit Dang
 * @param {Function} callback Callback function to perform
 * @param {any} data Data to pass as param 
 */
const performCallback = (callback, data) => {
  if (callback instanceof Function) {
    if (data !== undefined)
      return callback(data);
    callback();
  }
};


let config = {
  headers: { authorization: "Bearer " + AccessToken },
};
const errorHelper = (error, variant) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if (error.response.statusCode === 401) {
    if (variant === "login")
      return notify("Invalid Credentials");
    notify("You may have been logged out");
    //logout();
    return false;
  }
  if (error.response.data.message !== "") {
    notify(error.response.data.message);
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
}

class API {
  loginEmployer = async (data, setAccessToken) => {
    return await axiosInstance
      .post("/employer/login", data)
      .then(response => {
        setAccessToken(response.data.data.accessToken);
        return response.data.data.employerDetails;
      })
      .catch(error => {
        errorHelper(error);
        return false;
      });
  };


  logout = async (accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/employer/logout", {}, {
        headers: {
          authorization: "Bearer " + accessToken,
        }
      })
      .then(response => {
        return { "response": response }
      })
      .catch(error => window.localStorage.clear)
  }

  registerEmployer = async data => {
    return await axiosInstance
      .post("employer/register", data,
    )
      .then(response => {
        return { response: response.data };
      })
      .catch(error => {
        errorHelper(error);

      });
  };

  sendOTP = async (data, accessToken) => {
    //accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("employer/verifyOTP", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => {
        return response.status;
      })
      .catch(error => errorHelper(error))
  };

  postOpportunity = async (data) => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .post("/jobs/opportunities", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => response)
      .catch(error => errorHelper(error));
  };

  postOpportunityDraft = async (data) => {
    return await axiosInstance
      .post("/jobs/opportunityDraft", data, config)
      .then(response => response)
      .catch(error => console.log(error));
  };

  updateOpportunityDraft = async (data) => {
    return await axiosInstance
      .put("/jobs/updateOpportunityDraft", data, config)
      .then(response => response)
      .catch(error => console.log(error));
  };

  draftToOpportunity = async (data) => {
    return await axiosInstance
      .post("/jobs/postDraftToOpportunities", data, config)
      .then(response => response)
      .catch(error => errorHelper(error));
  };



  createMyCompany = async (data, accessToken) => {
    return await axiosInstance
      .post("/employer/createcompany", data, {
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
      .then(response => { return response })
      .catch(error => errorHelper(error));
  };

  getOpportunity = async (accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get("/employer/viewjobsposted", {
        headers: {
          authorization: "Bearer " + accessToken,
        }
      })
      .then(response => {
        return { response: response.data.data.jobsData, status: true };
      })
      .catch(error => {
        errorHelper(error);
        return { status: false };
      });
  };

  getOpportunityDraft = async accessToken => {
    accessToken = localStorage.getItem("accessToken");
    return axiosInstance
      .get("jobs/getOpportunityDraft", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        return {
          response: response.data.data.opportunityData,
          status: true,
        };
      })
      .catch(error => {
        errorHelper(error);
        return { status: false };
      });
  };

  getApplicantsData = async (data, accessToken) => {
    accessToken = localStorage.getItem("accessToken");
    return axiosInstance
      .post(
        "employer/viewjobapplicants",
        data,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          }
        }
      )
      .then(response => {
        return ({ "response": response.data.data });
      })
      .catch(error => errorHelper(error));
  };

  forgotPassword = async (data) => {
    return axiosInstance
      .post(
        "employer/forgotPassword",
        data
      )
      .then(response => {
        return ({ "response": response.data.data });
      })
      .catch(error => errorHelper(error));
  };


  forgotPasswordSecondStep = async (data) => {
    return axiosInstance
      .post(
        "employer/resetPassword",
        data
      )
      .then(response => {
        return ({ "response": response.data.data });
      })
      .catch(error => errorHelper(error));
  };


  getProfileEmployer = async (auth) => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .get('/employer/getProfile', {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      })
      .then(response => {
        return { "response": response.data.data.customerData }
      })
      .catch(error => {
        return errorHelper(error)
      })
  }

  uploadImage = async data => {
    return await axiosInstance
      .post("/upload/uploadImage", data, {
        headers: {
          "Content-Type": "multipart/form-data; boundary='boundary'",
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  getAddress = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return axios({
      method: "get",
      url: ` http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${input}`,
    })
      .then(response => response.data)
      .catch(error => errorHelper(error));
  };

  getLatLong = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return await axios({
      method: "get",
      url: ` http://geocoder.api.here.com/6.2/geocode.json?locationid=${input}&jsonattributes=1&gen=9&app_id=${app_id}&app_code=${app_code}`,
    })
      .then(response => {
        return {
          "response":
            response.data.response.view[0].result[0].location.displayPosition,
        };
      })
      .catch(error => errorHelper(error));
  };



  getCompanyDetails = async auth => {
    let accessToken = localStorage.getItem("accessToken");

    return await axiosInstance
      .get("/employer/getcompany", {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response.data.data.companyData };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  updateCompanyDetails = async (data) => {
    let accessToken = localStorage.getItem("accessToken");

    return await axiosInstance
      .put("/employer/updatecompany", data, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };


  updateShortList = async (array) => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .put("/jobs/updateShortListed", array, {
        headers: {
          "authorization": `bearer ${accessToken}`,
        },
      })
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  }


  deleteOppDraft = async (data) => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .delete(`jobs/deleteOpportunityDraft`,
        {
          headers: {
            "authorization": `bearer ${accessToken}`,
          },
          data
        })
      .then(response => response)
      .catch(error => errorHelper(error))
  }

  deleteOpp = async (data) => {
    let accessToken = localStorage.getItem("accessToken");
    return await axiosInstance
      .delete(`jobs/deleteOpportunities`,
        {
          headers: {
            "authorization": `bearer ${accessToken}`,
          },
          data
        })
      .then(response => response)
      .catch(error => errorHelper(error))
  }

  /**
   * 
   * @param {String} userId UserId 
   * @param {Function} callback Callback function 
   */
  getCandidateInfo = (userId, callback) => {
    axiosInstance.get(`search/user/${userId}`, {
      headers: {
        "authorization": `bearer ${getAccessToken()}`,
      }
    }).then(response => {
      performCallback(callback, response.data.data.user)
    }).catch(error => errorHelper(error));
  }

  /**
   * 
   * @param {String} name Name of the user to search
   * @returns {Promise(Array(Object))} 
   */
  searchUsersWithName = async (name) => {
    return axiosInstance.get(`search/users/name/${name}`, {
      headers: {
        "authorization": `bearer ${getAccessToken()}`,
      }
    }).then(response => {
      return response.data.data.users;
    }).catch(error => {
      return [];
    });
  }

}




const instance = new API();
export default instance;
