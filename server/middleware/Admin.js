import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const adminAuth = async (req, res, next) => {
    try {
        const password = req.headers.authorization;
        console.log(password);
        // 加密
        const pwdCheck = await bcrypt.compare(password, process.env.ADMIN_PWD);

        if (pwdCheck) {
            next();
        } else {
            console.log("password is not valid");
            return res.status(404).json({ message: "wrong password", type: "error" });
        }
    } catch (error) {
        console.log("password is not valid");
        return res.status(404).json({ message: "wrong password", type: "error" });
    }
};

export default adminAuth;
