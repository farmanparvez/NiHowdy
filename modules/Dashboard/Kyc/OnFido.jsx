import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as OnfidoSDK from "onfido-sdk-ui/dist/onfido.min.js";
import "onfido-sdk-ui/dist/style.css";
import { createCheck } from "../../../store/actions/kycAction";
import { reset } from "../../../store/slice/kycSlice";
const onfidoContainerId = "onfido-sdk-wrapper";

const OnFido = ({ sdkToken }) => {
    const dispatch = useDispatch()
    console.log(sdkToken)
    useEffect(() => {
        if (sdkToken)
            OnfidoSDK.init({
                token: sdkToken,
                containerId: onfidoContainerId,
                onComplete: function (data) {
                    dispatch(createCheck())
                }
            });

        return () => dispatch(reset())
    }, [sdkToken, dispatch])

    return (
        <div id={onfidoContainerId} />
    )
}

export default OnFido