import createResume from "../resume/resume.repository.js";

const uploadResume = async (req, res) => {
    const dummyParsedData = {
        userId: req.user.id,
        name: 'Shahbaz Alam',
        email: 'test@gmail.com',
        skills: ['React', 'Node', 'MongoDB'],
        education: ['BCA'],
        experience: ['1 year React Developer'],
        rawText: 'Full resume text here...'
    };

    try {
        const result = await createResume(dummyParsedData)
        res.status(201).json({
            success: true,
            message: "Resume upload successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        })
    }

}

export default uploadResume;