import React from 'react';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-around align-items-center p-5">
              <h1>{t('page404.title')}</h1>
              <p>{t('page404.text')}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page404;
