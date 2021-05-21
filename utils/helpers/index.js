const handleFileInput = (_file) => {
    if (_file) {
        if (_file.size > 1536 * 1000000) {
            toast("File size cannot exceed more than 1.5GB");
        } else {
            return {
                videoFileURL: URL.createObjectURL(_file),
                videoFileObject: _file,
            };
        }
    }
};

export { handleFileInput };