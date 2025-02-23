const API_URL = 'http://localhost:5000/api/v1';

// دالة للتعامل مع الأخطاء
const handleError = (error) => {
    console.error('Error:', error);
    if (error.response) {
        return error.response.data.error || 'حدث خطأ ما';
    }
    return 'حدث خطأ في الاتصال بالخادم';
};

// تسجيل مستخدم جديد
async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw { response: { data: data } };
        }

        // حفظ التوكن في localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// تسجيل الدخول
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw { response: { data: data } };
        }

        // حفظ التوكن في localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// تسجيل الخروج
async function logout() {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw { response: { data: data } };
        }

        // حذف التوكن من localStorage
        localStorage.removeItem('token');

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// الحصول على بيانات المستخدم الحالي
async function getCurrentUser() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw { response: { data: data } };
        }

        return data;
    } catch (error) {
        throw handleError(error);
    }
}

// التحقق من حالة تسجيل الدخول
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// الحصول على التوكن
function getToken() {
    return localStorage.getItem('token');
}

export {
    register,
    login,
    logout,
    getCurrentUser,
    isLoggedIn,
    getToken
};
