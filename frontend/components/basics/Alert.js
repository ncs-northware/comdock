import style from '@/layout/Alert.module.sass'
import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Alert({children, title = '', theme='info'}) {
    return (
        <div className={`${style.alert} ${style} flex`}>
            <div className={`${style.alertIcon} ${style[theme]} aspect-square relative`}>
                {
                    theme == 'info' ? (
                        <FontAwesomeIcon icon={faCircleInfo} size='lg' />
                    ) : 
                    theme == 'success' ? (
                        <FontAwesomeIcon icon={faCircleCheck} size='lg' />
                    ) : 
                    theme == 'warning' ? (
                        <FontAwesomeIcon icon={faCircleExclamation} size='lg' />
                    ) : 
                    theme == 'error' ? (
                        <FontAwesomeIcon icon={faCircleXmark} size='lg' />
                    ) : 
                    (<FontAwesomeIcon icon={faCircleInfo} size='lg' />)
                }
            </div>
            <div className={style.alertMessage}>
                <h3 className={`${style.alertTitle} text-roboto`}>{title}</h3>
                <div>{children}</div>
            </div>
        </div>
    )
}