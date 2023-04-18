import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1681847909116 implements MigrationInterface {
    name = 'createTables1681847909116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."permission_doctype_enum" AS ENUM('user', 'permission')`);
        await queryRunner.query(`CREATE TYPE "public"."permission_action_enum" AS ENUM('create', 'read', 'update', 'delete')`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctype" "public"."permission_doctype_enum" NOT NULL, "action" "public"."permission_action_enum" NOT NULL, "adminId" uuid, CONSTRAINT "UQ_53a4247f83f4126a0c6b4f49a24" UNIQUE ("doctype", "action", "adminId"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."admin_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "admin" ("name" character varying(45) NOT NULL, "dateOfBirth" date NOT NULL, "gender" "public"."admin_gender_enum" NOT NULL DEFAULT 'male', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(30) NOT NULL, "password" character(90) NOT NULL, "token" character varying(255) NOT NULL, "isActive" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."supervisor_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "supervisor" ("name" character varying(45) NOT NULL, "dateOfBirth" date NOT NULL, "gender" "public"."supervisor_gender_enum" NOT NULL DEFAULT 'male', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "departmentId" uuid, CONSTRAINT "UQ_f03c0861936e1aa8d3e25fedc4d" UNIQUE ("email"), CONSTRAINT "PK_6364b1ffaa6ca051de919c802ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_2acf9b4a880d0588141b332902c" UNIQUE ("name"), CONSTRAINT "PK_39379bba786d7a75226b358f81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "student" ("name" character varying(45) NOT NULL, "dateOfBirth" date NOT NULL, "gender" "public"."student_gender_enum" NOT NULL DEFAULT 'male', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "studyLevelId" uuid, "projectId" uuid, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "caption" character varying(255) NOT NULL, "originalName" character varying(255) NOT NULL, "path" character varying(255) NOT NULL, "mimetype" character varying(50) NOT NULL, "size" integer NOT NULL, "projectId" uuid, CONSTRAINT "UQ_389ae8ade08dd89760239251ccc" UNIQUE ("path"), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "keywords" text NOT NULL, "studyLevelId" uuid, "supervisorId" uuid, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "study_level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "departmentId" uuid, CONSTRAINT "PK_3782bca0800b6d4c75f9019eb68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "collegeId" uuid, CONSTRAINT "UQ_69ef28cbd0cdb51f1dfa27c5f64" UNIQUE ("name", "collegeId"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "college" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_52bce0385776c662605a10e9c09" UNIQUE ("name"), CONSTRAINT "PK_ebef1972362002203cdf7a22e0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_fields_field" ("projectId" uuid NOT NULL, "fieldId" uuid NOT NULL, CONSTRAINT "PK_0fbb1dbbb3a8e9ed70df0f76180" PRIMARY KEY ("projectId", "fieldId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f87809fd1fc0b377b9d795177" ON "project_fields_field" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_184e8c6836d2df74337627dbfc" ON "project_fields_field" ("fieldId") `);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_16ef59428860605bdc9e3dbc13b" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD CONSTRAINT "FK_9276fe269bba9d872555c949657" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_63c2fc612c902d1547560af3ba2" FOREIGN KEY ("studyLevelId") REFERENCES "study_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_b0dc5eec3a7b378bbb3c5793838" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_1609339df21e7616eb9ce3dec47" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_cd6553f1468a29a32129a7a1b7b" FOREIGN KEY ("studyLevelId") REFERENCES "study_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_1cba70fecafe255d7cb2cd5673a" FOREIGN KEY ("supervisorId") REFERENCES "supervisor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "study_level" ADD CONSTRAINT "FK_d51869a23fb5ace543296808dce" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_f2794ef29ed11eb91b94ab62494" FOREIGN KEY ("collegeId") REFERENCES "college"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_fields_field" ADD CONSTRAINT "FK_8f87809fd1fc0b377b9d7951778" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_fields_field" ADD CONSTRAINT "FK_184e8c6836d2df74337627dbfc0" FOREIGN KEY ("fieldId") REFERENCES "field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_fields_field" DROP CONSTRAINT "FK_184e8c6836d2df74337627dbfc0"`);
        await queryRunner.query(`ALTER TABLE "project_fields_field" DROP CONSTRAINT "FK_8f87809fd1fc0b377b9d7951778"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_f2794ef29ed11eb91b94ab62494"`);
        await queryRunner.query(`ALTER TABLE "study_level" DROP CONSTRAINT "FK_d51869a23fb5ace543296808dce"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_1cba70fecafe255d7cb2cd5673a"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_cd6553f1468a29a32129a7a1b7b"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_1609339df21e7616eb9ce3dec47"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_b0dc5eec3a7b378bbb3c5793838"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_63c2fc612c902d1547560af3ba2"`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP CONSTRAINT "FK_9276fe269bba9d872555c949657"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_16ef59428860605bdc9e3dbc13b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_184e8c6836d2df74337627dbfc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f87809fd1fc0b377b9d795177"`);
        await queryRunner.query(`DROP TABLE "project_fields_field"`);
        await queryRunner.query(`DROP TABLE "college"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "study_level"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
        await queryRunner.query(`DROP TABLE "field"`);
        await queryRunner.query(`DROP TABLE "supervisor"`);
        await queryRunner.query(`DROP TYPE "public"."supervisor_gender_enum"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_gender_enum"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TYPE "public"."permission_action_enum"`);
        await queryRunner.query(`DROP TYPE "public"."permission_doctype_enum"`);
    }

}
