import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from '@/layout/Alert.module.sass'



export default function AlertIcon({theme = 'info', size = 'lg'}) {
    return (
        <div className={`rounded-lg p-5 ${style[theme]} relative w-fit`}>
            {
                theme == 'info' ? (
                    <div>
                        <FontAwesomeIcon icon={faCircleInfo} size={size} />
                    </div>
                ) : 
                theme == 'success' ? (
                    <FontAwesomeIcon icon={faCircleCheck} size={size} />
                ) : 
                theme == 'warning' ? (
                    <FontAwesomeIcon icon={faCircleExclamation} size={size} />
                ) : 
                theme == 'error' ? (
                    <FontAwesomeIcon icon={faCircleXmark} size={size} />
                ) : 
                (<FontAwesomeIcon icon={faCircleInfo} size={size}/>)
            }
        </div>
    )
}