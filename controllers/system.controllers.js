const getSystemInformation = (req, res) => {
    res.render("system", {
        argEntrada: process.argv, 
        os: process.platform, 
        nodeVs: process.version, 
        memoryUsage: JSON.stringify(process.memoryUsage()), 
        excPath: process.execPath, 
        processID: process.pid, 
        folder: process.cwd(),
        user: req.session.user
       });
};

module.exports = getSystemInformation