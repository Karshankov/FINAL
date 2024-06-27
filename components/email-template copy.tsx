import * as React from 'react';

interface EmailTemplateProps {
  username: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
}) => (
  <div>
    <h1>{username}!</h1>
  </div>
);
