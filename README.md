# Api Documentation Back-End
---
> 1. `authUser` = header token untuk user
> 2. `authAdmin` = header token untuk admin
> 3. `verifyToken` = token user
> 4. `verifyAdmin` = token admin

## Daftar End Point :
## 1. User
### Auth
- Register (`POST`) : http://localhost:3000/User/register
- Login  (`POST`)   : http://localhost:3000/User/login
- Update User (`PUT`)    : http://localhost:3000/User/:id

### Join Kelas (Kelas Taken by User)
- Join Kelas (`POST`) : http://localhost:3000/kelasTaken/
- Get Kelas by Id (`GET`) : http://localhost:3000/kelasTaken/:id

### Nilai
- Create Nilai (`POST`) : http://localhost:3000/Nilai/
- Get Nilai by Id (`GET`) : http://localhost:3000/Nilai/:id

## 2. Admin

### Auth
- Register (`POST`) :  http://localhost:3000/Admin/register
- Login (`POST`) : http://localhost:3000/Admin/login
- Update User by Admin (`PUT`) : http://localhost:3000/Admin/updateUser/:id

### Kelas
- Create Kelas (`POST`) : http://localhost:3000/Kelas/
- Get All Kelas (`GET`) : http://localhost:3000/Kelas/
- Get Kelas by Id (`GET`) : http://localhost:3000/Kelas/:id
- Update Kelas (`PUT`) : http://localhost:3000/Kelas/:id
- Delete Kelas (`DELETE`) : http://localhost:3000/Kelas/:id

### Join Kelas (Kelas Taken By User)
- Update Join Kelas by Admin (`PUT`): http://localhost:3000/kelasTaken/

### Quiz
- Create Quiz (`POST`) : http://localhost:3000/Quiz/
- Get All Quiz (`GET`) : http://localhost:3000/Quiz/
- Get Quiz by Id (`GET`) : http://localhost:3000/Quiz/:id
- Update Quiz (`PUT`) : http://localhost:3000/Quiz/:id
- Delete Quiz (`DELETE`) : http://localhost:3000/Quiz/:id

### Nilai
- Update Nilai (`PUT`) : http://localhost:3000/Nilai/:id
- Delete Nilai (`DELETE`) : http://localhost:3000/Nilai/:id