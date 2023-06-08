import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
    userData: {},
    resumeData: null,
    documentsData: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

// pegar usuário
export const getUserData = createAsyncThunk('admin/user', async (user, thunkAPI) => {
    try {
        const response = await adminService.getUserData(user)
        return response
    } catch (error) {
        // caso ocorra algum erro
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// deletar usuário
export const deleteUser = createAsyncThunk('admin/delete', async (user, thunkAPI) => {
    try {
        const response = await adminService.deleteUser(user)
        return response
    } catch (error) {
        // caso ocorra algum erro
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


// pegar resumo do usuário
export const getResumeData = createAsyncThunk('admin/resume', async (user, thunkAPI) => {
    try {
        const response = await adminService.getResumeData(user)
        return response
    } catch (error) {
        // caso ocorra algum erro
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// pegar documentos do usuário
export const getDocumentsData = createAsyncThunk('admin/documents', async (user, thunkAPI) => {
    try {
        const response = await adminService.getDocumentsData(user)
        return response
    } catch (error) {
        // caso ocorra algum erro
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// alterar nível de acesso do usuário
export const alterAccess = createAsyncThunk('admin/role', async (user, thunkAPI) => {
    try {
        const response = await adminService.alterAccess(user)
        return response 
    } catch (error) {
        // caso ocorra algum erro
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: (builder) => {
        builder
            // pegar usuário
            .addCase(getUserData.pending, state => {
                state.isLoading = true
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.userData = action.payload
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            // pegar resumo do usuário
            .addCase(getResumeData.pending, state => {
                state.isLoading = true
            }
            )
            .addCase(getResumeData.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.resumeData = action.payload.splice(0, 1)[0]
            }
            )
            .addCase(getResumeData.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            }
            )
            // pegar documentos do usuário
            .addCase(getDocumentsData.pending, state => {
                state.isLoading = true
            }
            )
            .addCase(getDocumentsData.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.documentsData = action.payload        
            }
            )
            .addCase(getDocumentsData.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            }
            )
            // deletar usuário
            .addCase(deleteUser.pending, state => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            }
            )
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.message = action.payload
            }
            )
            .addCase(deleteUser.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            }
            )
            // alterar nível de acesso do usuário
            .addCase(alterAccess.pending, state => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            }
            )
            .addCase(alterAccess.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.isError = false
                state.userData = action.payload
            }
            )
            .addCase(alterAccess.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            }
            )        
            
    }

})


export const { reset } = adminSlice.actions
export default adminSlice.reducer