import express from 'express';
import {getUserProfile, getAllVoters } from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router  =express.Router()


router.get('/profile', verifyUser, getUserProfile)
router.get('/voters', verifyUser, getAllVoters)


export default router