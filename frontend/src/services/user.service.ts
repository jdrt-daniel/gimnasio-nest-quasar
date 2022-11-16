import api from 'src/boot/api';

const userService = () => {
  const getList = async (estado: string) => {
    try {
      const { data } = await api.get(`/usuario?estado=${estado}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async (id: string) => {
    try {
      const { data } = await api.get(`/usuario/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const saveData = async (formData: object) => {
    try {
      console.log(formData);

      const { data } = await api.post('/usuario', formData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateData = async (id: string, formData: object) => {
    try {
      const { data } = await api.put(`/usuario/${id}`, formData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteData = async (id: string) => {
    try {
      const { data } = await api.delete(`/usuario/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getList,
    getData,
    saveData,
    updateData,
    deleteData,
  };
};

export default userService;
