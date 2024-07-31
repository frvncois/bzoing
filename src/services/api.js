import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const addProject = async (project) => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('http://localhost:3000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
