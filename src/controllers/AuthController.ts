// controllers/AuthController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  register = async (req: Request, res: Response) => {
    const { firstname, lastname, username, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ firstname, lastname, username, password: hashedPassword, role });
      await this.userRepository.save(user);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {   
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const user = await this.userRepository.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'your-secret-key', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
}
