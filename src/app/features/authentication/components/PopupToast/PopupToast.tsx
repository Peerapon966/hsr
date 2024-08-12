import "@/features/authentication/assets/css/popupToast.css"

type PopupToastProps = {
    message: string
}

export default function PopupToast(props: PopupToastProps) {
    return (
        <>
            <div data-flex className="popup-container cross-axis-center main-axis-center">
                <div className="popup-toast-text">
                    {props.message}
                </div>
            </div>
        </>
    );
}