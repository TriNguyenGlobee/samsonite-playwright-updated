import { test, expect } from '@playwright/test';
import { EmailService } from './../../../utils/helpers/emailService';
import dotenv from 'dotenv';
dotenv.config();

test('Mailosaur basic test', async () => {
  const emailService = new EmailService();

  const email = emailService.generateEmail();

  console.log('Test email:', email);

  const message = await emailService.waitForEmail(
    email,
    'Test Subject'
  );

  expect(message).toBeTruthy();
});