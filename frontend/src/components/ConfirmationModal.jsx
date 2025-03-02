function ConfirmationModal({ isOpen, onClose, message, callbackFunction }) {

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-100 flex items-center justify-center backdrop-blur-xs`} onClick={onClose}>
            <div className="bg-white w-[400px] p-5 rounded-lg shadow-lg">
                <h2 className="text-xl text-center font-semibold mb-4">
                    {message}
                </h2>
                <div>
                    {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
                </div>

                <div className="flex justify-center gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer">Cancel</button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
                        onClick={() => {
                            onClose()
                            callbackFunction();
                        }}
                    >Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;