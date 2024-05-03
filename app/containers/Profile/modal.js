import React, { useEffect, useState } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
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
        <Modal isOpen={modalState} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
        </Modal>
    );
};


export default ModalComponent;