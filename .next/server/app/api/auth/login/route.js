/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/../node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/../node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n// app/api/auth/login/route.ts\n\n\n\n\nasync function POST(request) {\n    try {\n        const { username, password } = await request.json();\n        // Validate input\n        if (!username || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Username and password are required'\n            }, {\n                status: 400\n            });\n        }\n        // Find user in database\n        const [rows] = await _lib_db__WEBPACK_IMPORTED_MODULE_3__[\"default\"].execute(_lib_db__WEBPACK_IMPORTED_MODULE_3__.dbQueries.findUserByUsername, [\n            username\n        ]);\n        const users = rows;\n        if (users.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Invalid username or password'\n            }, {\n                status: 401\n            });\n        }\n        const user = users[0];\n        // Verify password\n        const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compare(password, user.password);\n        if (!isPasswordValid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Invalid username or password'\n            }, {\n                status: 401\n            });\n        }\n        // Generate JWT token\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n            userId: user.id,\n            username: user.username\n        }, process.env.JWT_SECRET || 'your-secret-key', {\n            expiresIn: '24h'\n        });\n        // Return success response\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Login successful',\n            user: {\n                id: user.id,\n                username: user.username,\n                email: user.email\n            },\n            token\n        });\n    } catch (error) {\n        console.error('Login error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsOEJBQThCO0FBQzBCO0FBQzFCO0FBQ0M7QUFDa0I7QUFFMUMsZUFBZUssS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRixRQUFRRyxJQUFJO1FBRWpELGlCQUFpQjtRQUNqQixJQUFJLENBQUNGLFlBQVksQ0FBQ0MsVUFBVTtZQUMxQixPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztZQUFxQyxHQUNoRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsd0JBQXdCO1FBQ3hCLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLE1BQU1ULCtDQUFJQSxDQUFDVSxPQUFPLENBQUNULDhDQUFTQSxDQUFDVSxrQkFBa0IsRUFBRTtZQUFDUDtTQUFTO1FBQzFFLE1BQU1RLFFBQVFIO1FBRWQsSUFBSUcsTUFBTUMsTUFBTSxLQUFLLEdBQUc7WUFDdEIsT0FBT2hCLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQStCLEdBQzFDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNTSxPQUFPRixLQUFLLENBQUMsRUFBRTtRQUVyQixrQkFBa0I7UUFDbEIsTUFBTUcsa0JBQWtCLE1BQU1qQix3REFBYyxDQUFDTyxVQUFVUyxLQUFLVCxRQUFRO1FBRXBFLElBQUksQ0FBQ1UsaUJBQWlCO1lBQ3BCLE9BQU9sQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztZQUErQixHQUMxQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEscUJBQXFCO1FBQ3JCLE1BQU1TLFFBQVFsQix3REFBUSxDQUNwQjtZQUFFb0IsUUFBUUwsS0FBS00sRUFBRTtZQUFFaEIsVUFBVVUsS0FBS1YsUUFBUTtRQUFDLEdBQzNDaUIsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUksbUJBQzFCO1lBQUVDLFdBQVc7UUFBTTtRQUdyQiwwQkFBMEI7UUFDMUIsT0FBTzNCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVE8sTUFBTTtnQkFDSk0sSUFBSU4sS0FBS00sRUFBRTtnQkFDWGhCLFVBQVVVLEtBQUtWLFFBQVE7Z0JBQ3ZCcUIsT0FBT1gsS0FBS1csS0FBSztZQUNuQjtZQUNBUjtRQUNGO0lBRUYsRUFBRSxPQUFPUyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxnQkFBZ0JBO1FBQzlCLE9BQU83QixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtZQUFFQyxTQUFTO1FBQXdCLEdBQ25DO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHByaW5jZSBzdW5ueVxcY2Fsb3JpZS1jb21wYXNzXFxhcHBcXGFwaVxcYXV0aFxcbG9naW5cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50c1xyXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5pbXBvcnQgcG9vbCwgeyBkYlF1ZXJpZXMsIFVzZXIgfSBmcm9tICdAL2xpYi9kYic7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcblxyXG4gICAgLy8gVmFsaWRhdGUgaW5wdXRcclxuICAgIGlmICghdXNlcm5hbWUgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6ICdVc2VybmFtZSBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbmQgdXNlciBpbiBkYXRhYmFzZVxyXG4gICAgY29uc3QgW3Jvd3NdID0gYXdhaXQgcG9vbC5leGVjdXRlKGRiUXVlcmllcy5maW5kVXNlckJ5VXNlcm5hbWUsIFt1c2VybmFtZV0pO1xyXG4gICAgY29uc3QgdXNlcnMgPSByb3dzIGFzIFVzZXJbXTtcclxuICAgIFxyXG4gICAgaWYgKHVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiAnSW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZCcgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyID0gdXNlcnNbMF07XHJcblxyXG4gICAgLy8gVmVyaWZ5IHBhc3N3b3JkXHJcbiAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICBcclxuICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6ICdJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIEpXVCB0b2tlblxyXG4gICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihcclxuICAgICAgeyB1c2VySWQ6IHVzZXIuaWQsIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lIH0sXHJcbiAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ3lvdXItc2VjcmV0LWtleScsXHJcbiAgICAgIHsgZXhwaXJlc0luOiAnMjRoJyB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFJldHVybiBzdWNjZXNzIHJlc3BvbnNlXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcsXHJcbiAgICAgIHVzZXI6IHtcclxuICAgICAgICBpZDogdXNlci5pZCxcclxuICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxyXG4gICAgICB9LFxyXG4gICAgICB0b2tlblxyXG4gICAgfSk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBlcnJvcjonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgbWVzc2FnZTogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJiY3J5cHQiLCJqd3QiLCJwb29sIiwiZGJRdWVyaWVzIiwiUE9TVCIsInJlcXVlc3QiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJyb3dzIiwiZXhlY3V0ZSIsImZpbmRVc2VyQnlVc2VybmFtZSIsInVzZXJzIiwibGVuZ3RoIiwidXNlciIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmUiLCJ0b2tlbiIsInNpZ24iLCJ1c2VySWQiLCJpZCIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiZXhwaXJlc0luIiwiZW1haWwiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB),\n/* harmony export */   dbQueries: () => (/* binding */ dbQueries),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initializeDatabase: () => (/* binding */ initializeDatabase)\n/* harmony export */ });\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2/promise */ \"mysql2/promise\");\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql2_promise__WEBPACK_IMPORTED_MODULE_0__);\n// lib/db.ts\n\nconst dbConfig = {\n    host: process.env.DB_HOST || 'localhost',\n    user: process.env.DB_USER || 'root',\n    password: process.env.DB_PASSWORD || '',\n    database: process.env.DB_NAME || 'auth_app',\n    waitForConnections: true,\n    connectionLimit: 10,\n    queueLimit: 0\n};\n// Create connection pool\nconst pool = mysql2_promise__WEBPACK_IMPORTED_MODULE_0___default().createPool(dbConfig);\n// Database connection function\nasync function connectDB() {\n    try {\n        const connection = await pool.getConnection();\n        console.log('MySQL Connected Successfully');\n        connection.release();\n        return pool;\n    } catch (error) {\n        console.error('Database connection failed:', error);\n        throw error;\n    }\n}\n// Database queries\nconst dbQueries = {\n    // Create users table\n    createUsersTable: `\n    CREATE TABLE IF NOT EXISTS users (\n      id INT AUTO_INCREMENT PRIMARY KEY,\n      username VARCHAR(50) UNIQUE NOT NULL,\n      email VARCHAR(100) UNIQUE NOT NULL,\n      password VARCHAR(255) NOT NULL,\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n    )\n  `,\n    // Find user by username\n    findUserByUsername: `\n    SELECT * FROM users WHERE username = ?\n  `,\n    // Find user by email\n    findUserByEmail: `\n    SELECT * FROM users WHERE email = ?\n  `,\n    // Find user by username or email\n    findUserByUsernameOrEmail: `\n    SELECT * FROM users WHERE username = ? OR email = ?\n  `,\n    // Create new user\n    createUser: `\n    INSERT INTO users (username, email, password) VALUES (?, ?, ?)\n  `,\n    // Get user by ID\n    getUserById: `\n    SELECT id, username, email, created_at FROM users WHERE id = ?\n  `\n};\n// Initialize database\nasync function initializeDatabase() {\n    try {\n        const connection = await connectDB();\n        await connection.execute(dbQueries.createUsersTable);\n        console.log('Database initialized successfully');\n    } catch (error) {\n        console.error('Database initialization failed:', error);\n        throw error;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsWUFBWTtBQUN1QjtBQUVuQyxNQUFNQyxXQUFXO0lBQ2ZDLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsT0FBTyxJQUFJO0lBQzdCQyxNQUFNSCxRQUFRQyxHQUFHLENBQUNHLE9BQU8sSUFBSTtJQUM3QkMsVUFBVUwsUUFBUUMsR0FBRyxDQUFDSyxXQUFXLElBQUk7SUFDckNDLFVBQVVQLFFBQVFDLEdBQUcsQ0FBQ08sT0FBTyxJQUFJO0lBQ2pDQyxvQkFBb0I7SUFDcEJDLGlCQUFpQjtJQUNqQkMsWUFBWTtBQUNkO0FBRUEseUJBQXlCO0FBQ3pCLE1BQU1DLE9BQU9mLGdFQUFnQixDQUFDQztBQUU5QiwrQkFBK0I7QUFDeEIsZUFBZWdCO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxhQUFhLE1BQU1ILEtBQUtJLGFBQWE7UUFDM0NDLFFBQVFDLEdBQUcsQ0FBQztRQUNaSCxXQUFXSSxPQUFPO1FBQ2xCLE9BQU9QO0lBQ1QsRUFBRSxPQUFPUSxPQUFPO1FBQ2RILFFBQVFHLEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE1BQU1BO0lBQ1I7QUFDRjtBQVlBLG1CQUFtQjtBQUNaLE1BQU1DLFlBQVk7SUFDdkIscUJBQXFCO0lBQ3JCQyxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O0VBU25CLENBQUM7SUFFRCx3QkFBd0I7SUFDeEJDLG9CQUFvQixDQUFDOztFQUVyQixDQUFDO0lBRUQscUJBQXFCO0lBQ3JCQyxpQkFBaUIsQ0FBQzs7RUFFbEIsQ0FBQztJQUVELGlDQUFpQztJQUNqQ0MsMkJBQTJCLENBQUM7O0VBRTVCLENBQUM7SUFFRCxrQkFBa0I7SUFDbEJDLFlBQVksQ0FBQzs7RUFFYixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCQyxhQUFhLENBQUM7O0VBRWQsQ0FBQztBQUNILEVBQUU7QUFFRixzQkFBc0I7QUFDZixlQUFlQztJQUNwQixJQUFJO1FBQ0YsTUFBTWIsYUFBYSxNQUFNRDtRQUN6QixNQUFNQyxXQUFXYyxPQUFPLENBQUNSLFVBQVVDLGdCQUFnQjtRQUNuREwsUUFBUUMsR0FBRyxDQUFDO0lBQ2QsRUFBRSxPQUFPRSxPQUFPO1FBQ2RILFFBQVFHLEtBQUssQ0FBQyxtQ0FBbUNBO1FBQ2pELE1BQU1BO0lBQ1I7QUFDRjtBQUVBLGlFQUFlUixJQUFJQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHByaW5jZSBzdW5ueVxcY2Fsb3JpZS1jb21wYXNzXFxsaWJcXGRiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGxpYi9kYi50c1xyXG5pbXBvcnQgbXlzcWwgZnJvbSAnbXlzcWwyL3Byb21pc2UnO1xyXG5cclxuY29uc3QgZGJDb25maWcgPSB7XHJcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCAnbG9jYWxob3N0JyxcclxuICB1c2VyOiBwcm9jZXNzLmVudi5EQl9VU0VSIHx8ICdyb290JyxcclxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQgfHwgJycsXHJcbiAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX05BTUUgfHwgJ2F1dGhfYXBwJyxcclxuICB3YWl0Rm9yQ29ubmVjdGlvbnM6IHRydWUsXHJcbiAgY29ubmVjdGlvbkxpbWl0OiAxMCxcclxuICBxdWV1ZUxpbWl0OiAwLFxyXG59O1xyXG5cclxuLy8gQ3JlYXRlIGNvbm5lY3Rpb24gcG9vbFxyXG5jb25zdCBwb29sID0gbXlzcWwuY3JlYXRlUG9vbChkYkNvbmZpZyk7XHJcblxyXG4vLyBEYXRhYmFzZSBjb25uZWN0aW9uIGZ1bmN0aW9uXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBwb29sLmdldENvbm5lY3Rpb24oKTtcclxuICAgIGNvbnNvbGUubG9nKCdNeVNRTCBDb25uZWN0ZWQgU3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgIHJldHVybiBwb29sO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBjb25uZWN0aW9uIGZhaWxlZDonLCBlcnJvcik7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn1cclxuXHJcbi8vIFVzZXIgaW50ZXJmYWNlXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBjcmVhdGVkX2F0OiBEYXRlO1xyXG4gIHVwZGF0ZWRfYXQ6IERhdGU7XHJcbn1cclxuXHJcbi8vIERhdGFiYXNlIHF1ZXJpZXNcclxuZXhwb3J0IGNvbnN0IGRiUXVlcmllcyA9IHtcclxuICAvLyBDcmVhdGUgdXNlcnMgdGFibGVcclxuICBjcmVhdGVVc2Vyc1RhYmxlOiBgXHJcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB1c2VycyAoXHJcbiAgICAgIGlkIElOVCBBVVRPX0lOQ1JFTUVOVCBQUklNQVJZIEtFWSxcclxuICAgICAgdXNlcm5hbWUgVkFSQ0hBUig1MCkgVU5JUVVFIE5PVCBOVUxMLFxyXG4gICAgICBlbWFpbCBWQVJDSEFSKDEwMCkgVU5JUVVFIE5PVCBOVUxMLFxyXG4gICAgICBwYXNzd29yZCBWQVJDSEFSKDI1NSkgTk9UIE5VTEwsXHJcbiAgICAgIGNyZWF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVAsXHJcbiAgICAgIHVwZGF0ZWRfYXQgVElNRVNUQU1QIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVAgT04gVVBEQVRFIENVUlJFTlRfVElNRVNUQU1QXHJcbiAgICApXHJcbiAgYCxcclxuXHJcbiAgLy8gRmluZCB1c2VyIGJ5IHVzZXJuYW1lXHJcbiAgZmluZFVzZXJCeVVzZXJuYW1lOiBgXHJcbiAgICBTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIHVzZXJuYW1lID0gP1xyXG4gIGAsXHJcblxyXG4gIC8vIEZpbmQgdXNlciBieSBlbWFpbFxyXG4gIGZpbmRVc2VyQnlFbWFpbDogYFxyXG4gICAgU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ID9cclxuICBgLFxyXG5cclxuICAvLyBGaW5kIHVzZXIgYnkgdXNlcm5hbWUgb3IgZW1haWxcclxuICBmaW5kVXNlckJ5VXNlcm5hbWVPckVtYWlsOiBgXHJcbiAgICBTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIHVzZXJuYW1lID0gPyBPUiBlbWFpbCA9ID9cclxuICBgLFxyXG5cclxuICAvLyBDcmVhdGUgbmV3IHVzZXJcclxuICBjcmVhdGVVc2VyOiBgXHJcbiAgICBJTlNFUlQgSU5UTyB1c2VycyAodXNlcm5hbWUsIGVtYWlsLCBwYXNzd29yZCkgVkFMVUVTICg/LCA/LCA/KVxyXG4gIGAsXHJcblxyXG4gIC8vIEdldCB1c2VyIGJ5IElEXHJcbiAgZ2V0VXNlckJ5SWQ6IGBcclxuICAgIFNFTEVDVCBpZCwgdXNlcm5hbWUsIGVtYWlsLCBjcmVhdGVkX2F0IEZST00gdXNlcnMgV0hFUkUgaWQgPSA/XHJcbiAgYFxyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBkYXRhYmFzZVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFiYXNlKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgY29ubmVjdERCKCk7XHJcbiAgICBhd2FpdCBjb25uZWN0aW9uLmV4ZWN1dGUoZGJRdWVyaWVzLmNyZWF0ZVVzZXJzVGFibGUpO1xyXG4gICAgY29uc29sZS5sb2coJ0RhdGFiYXNlIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBpbml0aWFsaXphdGlvbiBmYWlsZWQ6JywgZXJyb3IpO1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb29sOyJdLCJuYW1lcyI6WyJteXNxbCIsImRiQ29uZmlnIiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJEQl9IT1NUIiwidXNlciIsIkRCX1VTRVIiLCJwYXNzd29yZCIsIkRCX1BBU1NXT1JEIiwiZGF0YWJhc2UiLCJEQl9OQU1FIiwid2FpdEZvckNvbm5lY3Rpb25zIiwiY29ubmVjdGlvbkxpbWl0IiwicXVldWVMaW1pdCIsInBvb2wiLCJjcmVhdGVQb29sIiwiY29ubmVjdERCIiwiY29ubmVjdGlvbiIsImdldENvbm5lY3Rpb24iLCJjb25zb2xlIiwibG9nIiwicmVsZWFzZSIsImVycm9yIiwiZGJRdWVyaWVzIiwiY3JlYXRlVXNlcnNUYWJsZSIsImZpbmRVc2VyQnlVc2VybmFtZSIsImZpbmRVc2VyQnlFbWFpbCIsImZpbmRVc2VyQnlVc2VybmFtZU9yRW1haWwiLCJjcmVhdGVVc2VyIiwiZ2V0VXNlckJ5SWQiLCJpbml0aWFsaXplRGF0YWJhc2UiLCJleGVjdXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_prince_sunny_calorie_compass_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\prince sunny\\\\calorie-compass\\\\app\\\\api\\\\auth\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_prince_sunny_calorie_compass_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNwcmluY2UlMjBzdW5ueSU1Q2NhbG9yaWUtY29tcGFzcyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDcHJpbmNlJTIwc3VubnklNUNjYWxvcmllLWNvbXBhc3MmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxwcmluY2Ugc3VubnlcXFxcY2Fsb3JpZS1jb21wYXNzXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxwcmluY2Ugc3VubnlcXFxcY2Fsb3JpZS1jb21wYXNzXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "mysql2/promise":
/*!*********************************!*\
  !*** external "mysql2/promise" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql2/promise");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ms","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/bcryptjs","vendor-chunks/safe-buffer","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cprince%20sunny%5Ccalorie-compass&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();