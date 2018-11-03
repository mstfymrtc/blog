import axios from "axios";
export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POST = "CREATE_POST";
export const FETCH_POST = "FETCH_POST";
export const DELETE_POST = "DELETE_POST";
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=mstfymrtc";

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/posts${API_KEY}`, values)
    //SADECE İSTEK BAŞARILI OLURSA CALLBACK'I ÇAĞIRIYORUZ.
    //O DA NAVIGATE ETTİRİYOR.
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  //önce postShow fonksiyonunda adam delete'a basıyor.
  //sonra buraya geliyoruz callback ile.
  //axios satırı çalışıyor, ve request başlıyor.
  //o tamamlanana kadar state güncelleniyor (object stateden
  //siliniyor) ve component
  // state güncellendiği için re-render ediliyor.
  //fakat ortada obje olmadığı için Loading... yazıyor.

  //Bu esnada loading... yazarken alttaki request'ten success dönüyor ve
  //index'e navigate oluyoruz. önemli bunlar! ;)

  axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  };
}
