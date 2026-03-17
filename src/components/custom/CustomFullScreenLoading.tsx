

export const CustomFullScreenLoading = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
            {/* El Spinner */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

            {/* Texto opcional */}
            <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
                Espere un Momento...
            </p>
        </div>
    );
};