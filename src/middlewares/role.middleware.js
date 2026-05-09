
const roleGuard = (...role) => {
    return (req, res, next) => {
        console.log(role, "roles allowed")
        const allowed = role.includes(req.user.role)
        if (!allowed) return res.status(400).json({ success: false, message: "Access denied" })

        next()
    }
}

export default roleGuard