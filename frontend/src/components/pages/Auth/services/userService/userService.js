import requestData from "../../../../../utils/requestApi"

async function updateUser(user_id, userData, token) {
  const formData = new FormData()
  
  Object.keys(userData).forEach((key) => {
    if (key === "photo") {
      if (userData.photo instanceof File) {
        formData.append("photo", userData.photo)
      }
    } else {
      formData.append(key, userData[key])
    }
  })

  const response = await requestData(`/user/${user_id}`, 'PATCH', formData, token)
  return response
}

export default updateUser

