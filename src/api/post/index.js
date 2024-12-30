import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getPostAPI = async (postID) => {
  const response = await axios.get(`${SERVER_POST}/post/${postID}`)
  return response.data
}

const getNewFeedPostsAPI = async (userID) => {
  const response = await axios.get(`${SERVER_POST}/post/newfeed/${userID}`)
  return response.data
}

const getUserPostsAPI = async (userID, ownerID) => {
  const response = await axios.get(`${SERVER_POST}/post/user?userID=${userID}&ownerID=${ownerID}`)
  return response.data
}

const storePostAPI = async (data) => {
  const response = await axios.post(`${SERVER_POST}/post/store`, data)
  return response.data
}


const editPostAPI = async (postID, data) => {
  const response = await axios.put(`${SERVER_POST}/post/${postID}/edit`, data)
  return response.data
}

const trashPostAPI = async (postID) => {
  const response = await axios.put(`${SERVER_POST}/post/${postID}/trash`)
  return response.data
}
const deletePostAPI = async (postID) => {
  const response = await axios.delete(`${SERVER_POST}/post/${postAPI}/delete`)
  return response.data
}

const sharePostAPI = async (postID, data) => {
  const response = await axios.post(`${SERVER_POST}/post/${postID}/share`, data)
  return response.data
}

const postAPI = {
  getPostAPI,
  getUserPostsAPI,
  getNewFeedPostsAPI,
  storePostAPI,
  editPostAPI,
  trashPostAPI,
  deletePostAPI,
  sharePostAPI
}

export default postAPI
