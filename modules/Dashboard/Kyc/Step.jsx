import { Steps, theme, Result } from 'antd';
// import OnFido from './OnFido';
import { CsButton } from '../../../components/ui';
import { useDispatch } from 'react-redux';
import { setKycStatus } from '../../../store/slice/kycSlice';
import { getSdKToken } from '../../../store/actions/kycAction';
import { useEffect } from 'react';

const StepsComponent = (props) => {
    const { current, isKycStatus } = props
    const { token } = theme.useToken();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(kycStatus())
        dispatch(getSdKToken())
    }, [dispatch]);

    const Content = () => {
        return (
            <div className='flex justify-center items-center flex-col min-h-[76vh]'>
                <div>
                    <Result
                        status={isKycStatus === 3 ? 'success' : 'error'}
                        title={((isKycStatus === 4 && 'Your KYC is Rejected') || (isKycStatus === 3 && 'Thank you'))}
                        subTitle={((isKycStatus === 4 && 'Please check and resubmitt your KYC') || (isKycStatus === 3 && 'Your KYC is Completed'))}
                        extra={[isKycStatus === 4 && <CsButton type='pr' className='mx-2' onClick={() => dispatch(setKycStatus(1))}>Click here to Resubmit your KYC</CsButton>]}
                    />
                </div>
            </div >
        )
    }
    const steps = [
        {
            title: 'Start',
            content: <div>fido</div>,
            // content: <OnFido {...props} />,
        },
        {
            title: 'In Progress',
            content: 'Your kyc is now in progress',
        },
        {
            title: ((isKycStatus === 3 && 'Approved') || (isKycStatus === 4 && 'Rejected') || (isKycStatus !== 3 && 'Approved/Rejected') || (isKycStatus !== 4 && 'Approved/Rejected')),
            content: <Content />
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        // lineHeight: '260px',
        padding: '10px',
        minHeight: "76vh",
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    const statusValue = ((isKycStatus === 4 && 'error') || (isKycStatus === 1 && 'process') || (isKycStatus === 3 && 'finish') || (isKycStatus === 2 && 'process'))
    return (
        <>
            <Steps status={statusValue} size="small" current={current - 1} items={items} />
            <div style={contentStyle}>{steps[current - 1].content}</div>
        </>
    );
};

export default StepsComponent;