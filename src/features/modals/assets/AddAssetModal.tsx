import React, { useEffect, useRef, useState } from "react";
import styles from './AddAssetModal.module.css';

import { ReactComponent as SphereIcon } from '../../../icons/sidebar/primitives/primitive_sphere.svg'
import { ReactComponent as CubeIcon } from '../../../icons/sidebar/cube.svg';

import { AssetModalPrimitivesList } from "./AssetModalPrimitivesList";
import { ButtonLargeRectangle } from "../common/ButtonLargeRectangle";
import { ImportMeshModal } from "./ImportMeshModal";
import { ButtonBackRound } from "../common/ButtonBackRound";
import { useTransition, animated, easings, useSpring } from "react-spring";
import { ElementSize, useElementSize } from "../../../hooks/useElementSize";

type Props = {
    closeModal: () => void
}

type PageState = 'main' | 'primitives' | 'import';

export const AddAssetModal = ({closeModal}: Props) => {

    const [currentPage, setCurrentPage] = useState<PageState>('main');

    const [mainPageContentRef, mainPageSize] = useElementSize<HTMLDivElement>();
    const [primitivesContentRef, primitivesPageSize] = useElementSize<HTMLDivElement>();
    const [importDetailsContentRef, importDetailsPageSize] = useElementSize<HTMLDivElement>();

    const previousActivePageSizeRef = useRef<ElementSize>({width: 0, height: 0});

    const activePageSize = 
        currentPage === 'main' ? mainPageSize :
        currentPage === 'primitives' ? primitivesPageSize :
        importDetailsPageSize;
    
    const savePreviousPageSize = () => {
        previousActivePageSizeRef.current = activePageSize;
    }

    const modalSpring = useSpring({
        from: previousActivePageSizeRef.current,
        to: activePageSize.width > 0 ? activePageSize : previousActivePageSizeRef.current,
        width: activePageSize.width,
        height: activePageSize.height,
        config: { duration: 150, easing: easings.easeInOutQuad }
    });
    
    const contentTransition = useTransition(currentPage, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 150, easing: easings.easeInOutQuad },
        exitBeforeEnter: false,
    });


    const switchToPrimitivesList = () => {
        savePreviousPageSize()
        setCurrentPage('primitives');
    }

    const switchToImportDetails = () => {
        savePreviousPageSize()
        setCurrentPage('import');
    }

    const switchToMainPage = () => {
        savePreviousPageSize()
        setCurrentPage('main');
    }


    const renderPrimitivesList = () => {
        return (
            <div ref={primitivesContentRef} className={styles.contentsContainerPlaceholder}>
                <div className={styles.topBar}>
                    <ButtonBackRound onClick={switchToMainPage}/>
                </div>
                <AssetModalPrimitivesList closeModal={closeModal} />
            </div>
        )
    }

    const renderImportDetails = () => {
        return (
            <div ref={importDetailsContentRef} className={styles.contentsContainerPlaceholder}>
                <div className={styles.topBar}>
                    <ButtonBackRound onClick={switchToMainPage}/>
                </div>
                <ImportMeshModal src={""} closeModal={() => {}}/>
            </div>)
    }

    const renderMainPage = () => {
        return (<div ref={mainPageContentRef} className={styles.contentsContainerPlaceholder}>
            <section className={styles.pageSection}>
                <h3 className={styles.sectionTitle}>
                    Browse models
                </h3>

                <div className={styles.buttonsContainer}>
                    <ButtonLargeRectangle
                        onClick={ () => {switchToPrimitivesList()} }
                        displayName="Primitives"
                        icon={<SphereIcon/>}
                    />
                    <ButtonLargeRectangle
                        onClick={ () => {switchToImportDetails()} }
                        displayName="Models"
                        icon={<CubeIcon/>}
                    />
                </div>
            </section>
            <section className={styles.pageSection}>
                <h3 className={styles.sectionTitle}>
                    Import models
                </h3>
                <p> Something will be here later </p>
            </section>
        </div>);
    }


    return (<>
        <animated.div
            style={modalSpring}
            className={styles.modalContents}
        >
            {contentTransition((style, item) => (
                <animated.div style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}>
                    {item === 'main' && renderMainPage()}
                    {item === 'primitives' && renderPrimitivesList()}
                    {item === 'import' && renderImportDetails()}
                </animated.div>
            ))}
   
            {/* {contentTransition((style,item) => (
                <animated.div style={{ ...style, position: 'absolute', width: '100%', height: '100%' }}>
                    {item === 'main' && renderMainPage()}
                    {item === 'primitives' && renderPrimitivesList()}
                    {item === 'import' && renderImportDetails()}
                </animated.div>
            ))} */}
        </animated.div>
    </>);

}