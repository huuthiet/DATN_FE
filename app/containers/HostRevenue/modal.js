import React, { useEffect, useState } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Row,
} from 'reactstrap';

import { makeStyles } from '@material-ui/core';

//create a new modal component
const ModalComponent = (props) => {
    const { modal, toggle, className, modalTitle, children, footer } = props;
    const [modalState, setModalState] = useState(modal);

    useEffect(() => {
        setModalState(modal);
    }, [modal]);

    return (
        <Modal style={{ minHeight: '800px', minWidth: '50%' }} isOpen={modalState} toggle={toggle} className={className}>
            <ModalHeader style={{ fontWeight: '600', color: 'brown' }} toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody style={{ padding: '20px', fontSize: '16px', lineHeight: '1.6', bottom: '20px' }}>{children}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
        </Modal>
    );
};


export default ModalComponent;